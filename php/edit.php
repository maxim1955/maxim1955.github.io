<?php
if (isset($_SESSION['username'])) {
	if (isset($_GET['id'])) {
		$id = htmlspecialchars($_GET['id']);

		// $id=$id;

		// 			$conn = oci_connect($or_username, $or_passwd, $db4, $cod);
		$result = pdo()->prepare("SELECT * FROM partners WHERE ID='" . $id . "'");
		$result->execute();

		while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

			$partner_name = $row["partner_name"];
			$partner_org = $row["partner_org"];
			$partner_email = $row["partner_email"];
			$partner_phone = $row["partner_phone"];
			$expo_description = $row["expo_description"];
			$photo = $row["photo"];
			$partner_status = $row["partner_status"];
			$partner_logo = $row["partner_logo"];

			if (
				isset($_POST['partner_name']) && isset($_POST['partner_org']) && isset($_POST['partner_email'])
				&& isset($_POST['partner_phone'])
			) {

				$partner_name = htmlspecialchars($_POST['partner_name']);
				$partner_org = htmlspecialchars($_POST['partner_org']);
				$partner_email = htmlspecialchars($_POST['partner_email']);
				$partner_phone = htmlspecialchars($_POST['partner_phone']);
				$expo_description = htmlspecialchars($_POST['expo_description']);
				$photo = htmlspecialchars($_POST['photo']);
				$partner_status = htmlspecialchars($_POST['partner_status']);
				$partner_logo = htmlspecialchars($_POST['partner_logo']);

				$uploadDir1 = $_SERVER['DOCUMENT_ROOT'] . '/photos/';
				$pathInfo1 = pathinfo($_FILES['photo']['name']);
				$ext1 = array_pop(explode('.', $_FILES['photo']['name']));
				$path1 = 'photos/';
				$newFilename1 = time() . "." . $ext1;
				$photo = $path1 . $newFilename1;

				if(!move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir1 . $newFilename1))
					$photo = htmlspecialchars($_POST['photo']);

				$uploadDir2 = $_SERVER['DOCUMENT_ROOT'] . '/logos/';
				$pathInfo2 = pathinfo($_FILES['partner_logo']['name']);
				$ext2 = array_pop(explode('.', $_FILES['partner_logo']['name']));
				$path2 = 'logos/';
				$newFilename2 = time() . "." . $ext2;
				$partner_logo = $path2 . $newFilename2;

				if(!move_uploaded_file($_FILES['partner_logo']['tmp_name'], $uploadDir2 . $newFilename2))
					$partner_logo=htmlspecialchars($_POST['partner_logo']);

				$stmt = pdo()->prepare("UPDATE partners SET partner_name='" . $partner_name . "', partner_org='" . $partner_org
					. "', partner_email='" . $partner_email . "', partner_phone='" . $partner_phone . "', expo_description='" . $expo_description . "', 
				photo='" . $photo . "', partner_status='" . $partner_status . "', partner_logo = '" . $partner_logo . "' WHERE ID='" . $id . "'");
				$stmt->execute();
				header('Location: adminpanel.php?formsubmit');
			}

			?>
			<h4>Редактируем партнера <strong>
					<?php
					echo $id;
					?>
				</strong></h4>
			<form action="" method="post" enctype="multipart/form-data">
				<!--  -->
				<div class="col-md-9">
					<div class="col-sm-12">
						<div class="col-sm-12">
							<h5>Имя партнера</h5>
						</div>
						<div class="col-sm-12">

							<?php
							echo '<input value="' . $row["partner_name"] . '" class="form-control" name="partner_name" type="text" maxlength="50" placeholder="Имя партнера" required >';
							?>
							<h5>Наименование организации</h5>
							<?php
							echo '<input value="' . $row["partner_org"] . '" class="form-control" name="partner_org" type="text" maxlength="100" placeholder="Наименование организации" >';
							?>
							<h5>Email</h5>
							<?php
							echo '<input value="' . $row["partner_email"] . '" class="form-control" name="partner_email" type="text" maxlength="50" placeholder="Email" required >';
							?>
							<h5>Телефон</h5>
							<?php
							echo '<input value="' . $row["partner_phone"] . '" class="form-control" name="partner_phone" type="text" maxlength="50" placeholder="Телефон" required >';
							?>
							<h5>Описание экспоната</h5>
							<?php
							echo '<input value="' . $row["expo_description"] . '" class="form-control" name="expo_description" type="text" maxlength="500" placeholder="Описание экспоната" >';
							?>
							<h5>Фото экспоната</h5>
							<?php if (!$row["photo"]) {
								echo '<input type="file" name="photo">';
								// class="form-control"
							} else {
								echo '<input value="' . $row["photo"] . '" class="form-control" name="photo" type="text" maxlength="100" >';
							}
							?>
							<h5>Статус</h5>
							<?php
							echo '<input value="' . $row["partner_status"] . '" class="form-control" name="partner_status" type="text" maxlength="100" placeholder="В работе" >';
							?>
							<h5>Логотип</h5>
							<?php if (!$row["partner_logo"]) {
								echo '<input type="file" name="partner_logo">';
								// class="form-control"
							} else {
								echo '<input value="' . $row["partner_logo"] . '" class="form-control" name="partner_logo" type="text" maxlength="100" >';

							}
							?>
							<div style="padding-top: 30px"></div>
							<button class="btn btn-lg btn-success btn-block" type="submit">Сохранить изменения</button>

							<a class="btn btn-lg btn-success btn-block" href="?act=del&id=
						<?php
						echo ($id);
						?>
						">Удалить партнера</a>

						</div>
					</div>
			</form>
			<?php
		}
	}
} else {
	echo ("Необходима авторизация");
	?>
	  <div>
		<a class="nav-link" href="../index.html">Вернуться на главную</a>
	  </div>
	  <?php
  }
?>