<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Трансляции</title>
  <script src="js/jquery.js"></script>
  <script defer src="js/script.js"></script>
  <script defer src="js/click.js"></script>
  <script defer src="js/OpenClose.js"></script>
  <link rel="stylesheet" href="broadcast/broadcast.css" />
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/style-window.css" />
  <link rel="stylesheet" href="css/modals.css">
  <link rel="stylesheet" href="css/Modals_age.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js@9.0.1/public/assets/styles/choices.min.css" />
</head>


<body id="broadcast-body">

   <?php
  include_once 'system/header.php';
  ?>


  <main class="wrapper">
  <button id="feedback"></button>

  <section class="broadcast">
    <div class="container">
    <h2 class="wrap_text"> Записи эфиров</h2>
    <div class="wrap_div">

      <div class="div_img">
        <a href="" class="card card--one">
          <p class="card__date">23 октября Алматы</p>
          <div class="card__lock"></div>
          <div class="card__play"></div>
        </a>

        <a href="" class="card card--two">
          <p class="card__date">27 октября Уральск</p>
          <div class="card__lock"></div>
          <div class="card__play"></div>
        </a>

        <a href="" class="card card--three">
          <p class="card__date">29 октября Алматы</p>
          <div class="card__lock"></div>
          <div class="card__play"></div>
        </a>

        <a href="" class="card card--four">
          <p class="card__date">30 октября 4 город</p>
          <div class="card__lock"></div>
          <div class="card__play"></div>
        </a>

      </div>

        <img class="img_robot" src="broadcast/img/robot-bg.webp" alt="">
    </div>
    </div>
  </section>

    <?php
    include_once 'system/modalfeedback.php';
    ?>

    <?php
    include_once 'system/modalunder14.php';
    ?>
    <?php
    include_once 'system/modalover14.php';
    ?>

  </main>

  <div class="bottom">

  </div>


  <?php
  include_once 'system/footer.php';
  ?> 

  


  <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
  <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js"></script>
  <script src="broadcast/broadcast.js"></script>
  <script src="js/inputmask.js"></script>
  <script src="js/modal-age.js"></script>
  <script src="js/modals.js"></script>
</body>

</html>