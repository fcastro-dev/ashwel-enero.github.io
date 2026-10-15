/* =========================================================
   Taller "Masas para Familias Felices" – Ashwel
   /education/taller-masas/js/main.js
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURACIÓN – cambia aquí tu número de WhatsApp
   Formato internacional, solo dígitos, sin "+" ni espacios.
   Ejemplo: 584141234567
   --------------------------------------------------------- */
const WHATSAPP_NUMERO = "584142178738";

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

  /* 2. Cierra el menú móvil al elegir una opción */
  const menu = document.getElementById("menuPrincipal");
  if (menu && window.bootstrap) {
    menu.querySelectorAll(".nav-link").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        if (menu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }
});
