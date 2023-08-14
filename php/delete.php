<?php
if (isset($_SESSION['username'])) {
	if (isset($_GET['id'])) {
		// isset($_GET['id'])
		$id = htmlspecialchars($_GET['id']);

		$result = pdo()->prepare("DELETE FROM partners WHERE ID='" . $id . "'");
		$result->execute();
		echo ("Партнер " . $id . " успешно удален.");
	} else
		echo ("Партнера с таким ID не существует.");
} else {
	echo ("Необходима авторизация");
	?>
	<div>
		<a class="nav-link" href="../index.html">Вернуться на главную</a>
	</div>
	<?php
}