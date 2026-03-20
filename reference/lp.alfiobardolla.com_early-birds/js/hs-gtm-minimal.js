/* 28/11/2025
 * hs-gtm-minimal.js — submit_ok solo su invio reale + replay di backup
 * - Salva i dati durante la compilazione (sessionStorage + cookie)
 * - Invia `submit_ok` SOLO quando HubSpot conferma l’invio (postMessage) E i dati sono completi
 * - Se il redirect è troppo rapido, salva l’evento in sessionStorage e lo riproduce come `submit_ok_replay` al load successivo
 */
(function () {
  if (window.__HS_GTM_MINIMAL_LOADED__) { console.info('[hs-gtm] already loaded'); return; }
  window.__HS_GTM_MINIMAL_LOADED__ = true;

  const hasConsent = () => true;

  // ---------- tiny DL replay queue ----------
  const QKEY = 'abtg_dlqueue';
  function readQ() {
    try { return JSON.parse(sessionStorage.getItem(QKEY) || '[]'); } catch { return []; }
  }
  function writeQ(arr) {
    try { sessionStorage.setItem(QKEY, JSON.stringify(arr)); } catch {}
  }
  function enqueue(evt) {
    const q = readQ();
    q.push({ t: Date.now(), evt });
    writeQ(q);
  }
  // al load, riproduciamo eventuali eventi recenti (<= 30s) e poi puliamo
  function replayQueueIfAny() {
    const now = Date.now();
    const q = readQ();
    if (!q.length) return;
    const remain = [];
    q.forEach(item => {
      if (!item || !item.evt) return;
      if (now - (item.t || 0) <= 30000) {
        // segnaliamo come replay per evitare dedup mirata
        const replayEvt = Object.assign({}, item.evt, { event: (item.evt.event || 'submit_ok') + '_replay' });
        window.dataLayer.push(replayEvt);
      }
    });
    writeQ(remain); // svuotiamo
  }

  // ---------- logger DL (lasciamo uguale) ----------
  const CLEAR_KEYS = {
    fields: undefined, field_name: undefined, field_type: undefined,
    total: undefined, filled: undefined, percent: undefined,
    form_id: undefined, gtm_element: undefined, gtm_elementId: undefined, gtm_elementClasses: undefined
  };
  window.dataLayer = window.dataLayer || [];
  if (!window.__DL_WRAPPER_INSTALLED__) {
    const dl = window.dataLayer;
    const orig = dl.push.bind(dl);
    dl.push = function (payload) {
      try { if (payload && typeof payload === 'object') Object.assign(payload, CLEAR_KEYS);
        console.info('📤 dataLayer.push', JSON.parse(JSON.stringify(payload)));
      } catch { console.info('📤 dataLayer.push', payload); }
      return orig(payload);
    };
    window.__DL_WRAPPER_INSTALLED__ = true;
  }

  // ---------- utils ----------
  const PRIVACY_HINT = /(privacy|gdpr|consenso|consent|legal|lega[l]|policy)/i;
  const isEmailEl = (el) => el && (el.type === 'email' || /email/i.test(el.name || '') || /email/i.test(el.id || ''));
  const isTelEl   = (el) => el && (el.type === 'tel' || /(tel|phone|telefono|mobile|cell)/i.test((el.name || '') + ' ' + (el.id || '')));
  const isTextLike= (el) => el && ((el.tagName === 'INPUT' && (el.type || '').toLowerCase() === 'text') || el.tagName === 'TEXTAREA');

  const readTextValue = (form, el) => {
    const t = (el.type || '').toLowerCase();
    if (t === 'radio') {
      const sel = form.querySelector(`input[type="radio"][name="${CSS.escape(el.name)}"]:checked`);
      return sel ? (sel.value || '').trim() : '';
    }
    return (el.value || '').trim();
  };

  // telefono HubSpot → tenta hidden, poi visibile, poi select prefisso
  const getPhoneE164 = (form) => {
    const hidden = form.querySelector('input[name="phone"]');
    const hv = (hidden && hidden.value || '').trim();
    if (hv && hv.startsWith('+')) return hv;

    const tel = form.querySelector('input[type="tel"]');
    if (!tel) return '';
    const v = (tel.value || '').trim();

    const m = v.match(/^\+\d+(?:\s+)?(.*)$/);
    if (m) {
      const digits = v.replace(/[^\d+]/g, '');
      return digits.startsWith('+') ? digits : '';
    }
    const sel = form.querySelector('select[id^="phone_ext"], select[name$="phone_ext"]');
    const dial = (sel && sel.options && sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].text || '').match(/\+\d+/);
    const digitsOnly = v.replace(/[^\d]/g, '');
    if (dial && digitsOnly) {
      const d = dial[0];
      const local = digitsOnly.replace(/^0+/, '');
      return d + local;
    }
    return '';
  };

  const isPrivacyEl = (form, el) => {
    if (!el || (el.type || '').toLowerCase() !== 'checkbox') return false;
    const hint = ((el.name || '') + ' ' + (el.id || '')).toLowerCase();
    if (PRIVACY_HINT.test(hint)) return true;
    const wrap = el.closest('.hs-form-field') || el.parentElement;
    const text = (wrap?.textContent || '').toLowerCase();
    return PRIVACY_HINT.test(text);
  };

  const packInputs = (form) => {
    const inputs = {};
    const all    = Array.from(form.querySelectorAll('input,textarea,select'));
    const email  = all.find(isEmailEl) || null;
    const tel    = all.find(isTelEl)   || null;

    const fName = form.querySelector('input[name="firstname"]');
    const lName = form.querySelector('input[name="lastname"]');

    if (fName) inputs.firstname = readTextValue(form, fName);
    if (lName) inputs.lastname  = readTextValue(form, lName);

    if (!inputs.firstname || !inputs.lastname) {
      const texts = all.filter(el => isTextLike(el) && el !== email && el !== tel);
      if (!inputs.firstname && texts[0]) inputs.firstname = readTextValue(form, texts[0]);
      if (!inputs.lastname  && texts[1]) inputs.lastname  = readTextValue(form, texts[1]);
    }
    if (email) inputs.email = readTextValue(form, email);

    const e164 = getPhoneE164(form);
    if (e164) inputs.phone = e164;

    const checkbox = Array.from(form.querySelectorAll('input[type="checkbox"]')).find(el => isPrivacyEl(form, el));
    inputs.privacy = !!(checkbox && checkbox.checked);

    return inputs;
  };

  // validazione anti-rumore
  const nonEmpty   = (s) => typeof s === 'string' && s.trim().length > 0;
  const validEmail = (e) => nonEmpty(e) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validPhone = (p) => nonEmpty(p) && /^\+\d{6,15}$/.test(p);
  const isCompleteAndValid = (i) =>
    nonEmpty(i.firstname) && nonEmpty(i.lastname) && validEmail(i.email) && validPhone(i.phone) && i.privacy === true;

  // persistenza minimi per prefill
  const persistInputs = (i) => {
    const fname = i.firstname || i.first_name || '';
    const lname = i.lastname  || i.last_name  || '';
    const email = i.email     || '';
    const phone = i.phone     || '';
    if (!email && !fname && !lname && !phone) return;
    try { sessionStorage.setItem('abtg_prefill', JSON.stringify({ fname, lname, email, phone })); } catch {}
    document.cookie = 'abtg_checkout_access=1; Max-Age=900; Path=/; SameSite=Lax; Secure';
  };

  const getHsId = (form) => form.getAttribute('data-form-id') || form.id || 'unknown';

  // bind su form
  const attachForm = (form) => {
    if (form.dataset.hsMinimalBound) return;
    form.dataset.hsMinimalBound = '1';

    const formId = getHsId(form);
    let lastEmail = '', lastTel = '';

    const fireStart = () => {
      if (form.__hsStarted || !hasConsent()) return;
      form.__hsStarted = true;
      window.dataLayer.push({ event: 'form_start', form_provider: 'hubspot', formId });
    };
    form.addEventListener('pointerdown', fireStart, { capture: true, once: true });
    form.addEventListener('keydown',     fireStart, { capture: true, once: true });
    form.addEventListener('focusin',     fireStart, { capture: true, once: true });

    form.addEventListener('blur', (e) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const inputs = packInputs(form);
      persistInputs(inputs);

      if (isEmailEl(el)) {
        const emailVal = (el.value || '').trim();
        if (emailVal && emailVal !== lastEmail) {
          lastEmail = emailVal;
          window.dataLayer.push({ event: 'filled_email', form_provider: 'hubspot', formId, inputs });
        }
      }
      if (isTelEl(el)) {
        setTimeout(() => {
          const telVal = getPhoneE164(form);
          if (telVal && telVal !== lastTel) {
            lastTel = telVal;
            const inputs2 = packInputs(form);
            persistInputs(inputs2);
            window.dataLayer.push({ event: 'filled_tel', form_provider: 'hubspot', formId, inputs: inputs2 });
          }
        }, 0);
      }
    }, true);

    form.addEventListener('input', (e) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      if (isEmailEl(el) || isTelEl(el) || el.name === 'firstname' || el.name === 'lastname') {
        const inputs = packInputs(form);
        persistInputs(inputs);
      }
    }, true);

    // niente push su observer
    const parent = form.closest('.hs-form-private') || form.parentElement || form;
    const mo = new MutationObserver(() => {
      const gone = !document.body.contains(form);
      const thanksVisible = parent.querySelector('.submitted-message, .hs-form__thank-you, .thank-you-message');
      if ((gone || thanksVisible) && !form.__hsSubmitPushed) {
        form.__hsSubmitPushed = true;
        const inputs = packInputs(form);
        persistInputs(inputs);
      }
    });
    mo.observe(parent, { childList: true, subtree: true });
  };

  window.__HS_ABTG_ATTACH_FORM__ = attachForm;

  // postMessage HubSpot (invio reale)
  const isAllowedOrigin = (origin) =>
    /^https:\/\/(app\.hubspot\.com|forms(?:-eu\d+|-na\d+)?\.hsforms\.com|forms\.hubspot\.com)$/.test(origin);

  window.addEventListener('message', (event) => {
    try {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      // forme alternative viste in wild: { type:'hsFormCallback', eventName:'onFormSubmitted', id:'...' }
      // oppure { messageType:'hsFormCallback', eventName:'onFormSubmitted', id:'...' }
      const typeOk = (data.type === 'hsFormCallback' || data.messageType === 'hsFormCallback');
      if (!typeOk) return;
      if (!isAllowedOrigin(event.origin)) return;

      const eventName = data.eventName || data.name || '';
      const hs_form_guid = data.id || data.guid || '';
      if (eventName === 'onFormSubmitted') {
        const form =
          document.querySelector(`form.hs-form[data-form-id="${hs_form_guid}"]`) ||
          document.getElementById(`hsForm_${hs_form_guid}`) ||
          document.querySelector(`form#hsForm_${hs_form_guid}`) ||
          document.querySelector('form.hs-form');

        const inputs = form ? packInputs(form) : {};
        persistInputs(inputs);

        if (isCompleteAndValid(inputs)) {
          const payload = {
            event: 'submit_ok',
            form_provider: 'hubspot',
            formId: String(hs_form_guid || ''),
            submit_status: 'success',
            inputs
          };
          // push immediato + backup in coda per replay dopo redirect
          window.dataLayer.push(payload);
          enqueue(payload);
        } else {
          // opzionale per debug:
          // window.dataLayer.push({ event: 'submit_rejected', form_provider: 'hubspot', formId: String(hs_form_guid||''), reason:'invalid_or_incomplete', inputs });
        }
      }
    } catch (_) {}
  });

  // init + observer globale
  const init = () => {
    replayQueueIfAny(); // 👈 prima cosa: riproduci eventuali eventi salvati
    document.querySelectorAll('.hs-form-private form.hs-form, form.hs-form').forEach(attachForm);
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          n.matches?.('.hs-form-private form.hs-form, form.hs-form') && attachForm(n);
          n.querySelectorAll?.('.hs-form-private form.hs-form, form.hs-form').forEach(attachForm);
        })
      );
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// fallback: ri-attacca se Elementor/HubSpot rimonta la form tardi
setInterval(function(){
  var attach = window.__HS_ABTG_ATTACH_FORM__;
  if (!attach) return;
  document.querySelectorAll('.hs-form-private form.hs-form, form.hs-form').forEach(function(f){
    if (!f.dataset.hsMinimalBound) attach(f);
  });
}, 800);