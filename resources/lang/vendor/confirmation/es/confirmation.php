<?php

return [
    'email-title' => 'Confirmación de Email',
    'email-intro'=> 'Para confirmar tu correo, haz click en el botón',
    'email-button' => 'Confirmación',
    'message' => 'Gracias por registrarte. Por favor revisa tu correo para confirmar tu cuenta.',
    'success' => 'Has confirmado tu correo. Ahora puedes ingresar.',
    'again' => 'Debes confirmar tu correo antes de acceder al sitio. ' .
                '<br>Si no has recibido el correo de confirmación, por favor revisa tu bandeja de spam.'.
                '<br>Para enviar un nuevo correo de confirmación, <a href="' . url('confirmation/resend') . '" class="white-text" style="text-decoration:underline;">presiona aquí</a>.',
    'resend' => 'Un correo de confirmación ha sido enviado. Por favor revisa tu correo.'
];
