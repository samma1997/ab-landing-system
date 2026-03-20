document.addEventListener("DOMContentLoaded", function () {
  console.log("[AB] hubspot-campaign.js caricato (LP, no cookie)");

  /* -----------------------------
   *  Helper per recuperare il form
   *  dal messaggio HubSpot
   * ----------------------------- */
  function getHubspotFormElement(data) {
    var formId = data.id; // GUID del form HubSpot
    if (formId) {
      var sel = "form[data-form-id='" + formId + "']";
      var form = document.querySelector(sel);
      if (form) return form;
    }
    // fallback: primo form con data-form-id
    return document.querySelector("form[data-form-id]");
  }

  /* -----------------------------
   *  Listener eventi HubSpot
   * ----------------------------- */
  window.addEventListener("message", function (event) {
    // filtriamo solo i messaggi HubSpot
    if (
      !event.data ||
      (typeof event.data === "object" && event.data.type !== "hsFormCallback")
    ) {
      return;
    }

    var data = event.data;

    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return;
      }
      if (!data || data.type !== "hsFormCallback") return;
    }

    var eventName = data.eventName;
    var formEl = getHubspotFormElement(data);

    if (!formEl) {
      console.log("[AB] Nessun form HubSpot trovato nel DOM");
      return;
    }

    // onFormReady: per ora solo log (niente prefill su LP)
    if (eventName === "onFormReady") {
      console.log("[AB] HubSpot onFormReady intercettato:", data);
      return;
    }

    //  onFormSubmit → logica campaign-check + redirect immediato
    if (eventName !== "onFormSubmit") {
      return;
    }

    console.log("[AB] HubSpot onFormSubmit intercettato:", data);

    var email =
      (formEl.querySelector("input[name='email']") || {}).value || "";
    var campaignId =
      (formEl.querySelector(
        "input[name='id_check_campagna_sfdc_aventi_diritto']"
      ) || {}).value || "";
    var redirectNo =
      (formEl.querySelector("input[name='redirect_no_campagna']") || {})
        .value || "";
    var redirectSi =
      (formEl.querySelector("input[name='redirect_si_campagna']") || {})
        .value || "";

    console.log("[AB] Valori letti dal form:", {
      email: email,
      campaignId: campaignId,
      redirectNo: redirectNo,
      redirectSi: redirectSi,
    });

    if (!email || !campaignId) {
      console.log("[AB] Dati insufficienti per campaign-check, esco");
      return;
    }

    console.log("[AB] Richiedo campaign-check per:", email, campaignId);

    fetch("/wp-json/ab/v1/campaign-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, campaignId: campaignId }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (res) {
        console.log("[AB] campaign-check response:", res);

        if (res.error || typeof res.inCampaign === "undefined") {
          console.log("[AB] Errore o risposta non valida, lascio redirect HubSpot");
          return;
        }

        var inCamp = !!res.inCampaign;
        var target = inCamp ? redirectSi : redirectNo;

        if (target) {
          console.log(
            "[AB] Redirect immediato verso:",
            target,
            " (inCampagna=" + inCamp + ")"
          );
          window.top.location.href = target;
        } else {
          console.log(
            "[AB] Nessun redirect custom (manca redirectNo/redirectSi), lascio HubSpot."
          );
        }
      })
      .catch(function (err) {
        console.error("[AB] errore campaign-check:", err);
      });
  });
});
