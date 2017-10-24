<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Confirmación de correo</title>
  </head>
  <body>
    <a href="{{ action('Auth\RegisterController@confirm', [id => $user->id, 'token' => $user->confirmation_code]) }}">Confirmar correo</a>
  </body>
</html>
