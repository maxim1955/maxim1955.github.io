<!doctype html>
<html lang="en">
<?php
require_once __DIR__ . '/boot.php';
if (isset($_SESSION['username'])) {
  ?>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Админка</title>
    <link rel="stylesheet" href="../css/bootstrap.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"> -->
  </head>

  <body>
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Партнеры</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" disabled>Мастерклассы</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" disabled>Участники</a>
              </li>
            </ul>

            <a class="navbar-brand"> Добро пожаловать, <span>
                <?php echo ($_SESSION['username']);
                ?>
              </span>
            </a>
            <form method="post" action="exit.php">
              <button type="submit" class="navbar-brand"
                style="background: transparent; color: white; border: none;">Выход</button>

            </form>
          </div>
        </div>
      </nav>

      <?php
      if (isset($_GET['act'])) {
        $act = htmlspecialchars($_GET['act']);
      }
      if ($act == "edit") {
        include_once 'edit.php';
      }
      else if($act=="del")
		{
			include_once 'delete.php';
		}

    if(isset($_GET['formsubmit'])) echo "<script>alert('Изменения сохранены!');</script>";

      $sql = "select ID, partner_name, partner_org, partner_email, partner_phone  from partners";
      $result = pdo()->prepare($sql);
      $result->execute();

      ?>      
      <h1 style="padding: 20px 40px">Партнеры</h1>
      <table class="table table-striped" style="font-size: 20px">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ф.И.О.</th>
            <th scope="col">Организация</th>
            <th scope="col">Email</th>
            <th scope="col">Телефон</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <?php
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
          // print_r($row);
          echo "<tr>\n<td>" . $row["ID"] . "</td>" . "\n" . "<td>" . "" . $row["partner_name"] . "

</td>" . "\n" . "<td>" . "" . $row["partner_org"] . "</td>" . "\n" . "<td>" . "" . $row

            ["partner_email"] . "</td>" . "\n" . "<td>" . "" . $row["partner_phone"] . "</td>" . "\n" . "<td>

" . '<a href="?act=edit&id=' . $row["ID"] . '"type="button" class="btn btn-sm btn-default">Изменить</a>' . "</td>" . "\n";
        }
        ?>
      </table>

    </div>
    <?php
} else {
  echo ("Необходима авторизация");
  ?>
    <div>
      <a class="nav-link" href="../index.html">Вернуться на главную</a>
    </div>
    <?php
}
?>
</body>

</html>