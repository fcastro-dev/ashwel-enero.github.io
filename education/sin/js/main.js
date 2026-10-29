const WHATSAPP_NUMERO = "584142178738";
const PAYMENT_BANK = "Bancamiga (0172)";
const PAYMENT_CEDULA = "V-14.831.133";
const PAYMENT_TEL = "0414-217-8738";
const CELLPHONE = "+58 0414-217-8738";

const BINANCE_ID = "00000000";
const BINANCE_MAIL = "shaday2081@gmail.com";

document.getElementById("pm-banco").textContent = PAYMENT_BANK;
document.getElementById("pm-cedula").textContent = PAYMENT_CEDULA;
document.getElementById("pm-tel").textContent = PAYMENT_TEL;
document.getElementById("pm-todo").textContent = PAYMENT_TEL + '|' + PAYMENT_CEDULA + '|' + PAYMENT_BANK;

document.querySelectorAll(".cellphone").forEach((el) => { el.textContent = CELLPHONE; });

document.getElementById("bn-id").textContent = BINANCE_ID;
document.getElementById("bn-mail").textContent = BINANCE_MAIL;


document.addEventListener("DOMContentLoaded", () => {

  /* 1. Actualiza todos los botones de WhatsApp con el número configurado */
  document.querySelectorAll(".js-whatsapp").forEach((boton) => {
    try {
      const url = new URL(boton.href);
      url.pathname = "/" + WHATSAPP_NUMERO;
      boton.href = url.toString();
    } catch (e) {
      /* Si algo falla, se mantiene el enlace escrito en el HTML */
    }
  });
});

// Botones "Copiar" de la sección de pago
document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    var text = (el.id === 'bn-mail') ? el.textContent : el.textContent.replace(/[^\d\w\s\|\(\)]/g, '').replace(/\|/g, ' ');
    var done = function () {
      var old = btn.textContent;
      btn.textContent = '¡Copiado!';
      btn.classList.add('done');
      setTimeout(function () { btn.textContent = old; btn.classList.remove('done'); }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text.trim()).then(done);
    } else {
      var t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(t);
    }
  });
});