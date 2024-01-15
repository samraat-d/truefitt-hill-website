<?php
include("gift.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!--
     - Roxy: Bootstrap template by GettTemplates.com
     - https://gettemplates.co/roxy
    -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Gift Card</title>
    <meta name="description" content="Roxy">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- External CSS -->
    <link rel="stylesheet" href="../vendor/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../vendor/select2/select2.min.css">
    <link rel="stylesheet" href="../vendor/owlcarousel/owl.carousel.min.css">
    <link rel="stylesheet" href="../vendor/lightcase/lightcase.css">
     <link rel="stylesheet" href="../https://unpkg.com/aos@next/dist/aos.css" />

    <!-- Fonts and Icons-->
    <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Work+Sans:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="../new-home-page/css/collapsing_content.css">
    <link rel="stylesheet" href="../css/style.min.css">
    <link rel="stylesheet" href="../css/table.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <!-- Modernizr JS for IE8 support of HTML5 elements and media queries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
</head>
<body data-spy="scroll" data-target="#navbar" class="static-layout">
	<div id="side-nav" class="sidenav">
	<a href="javascript:void(0)" id="side-nav-close">&times;</a>
	
	<div class="sidenav-content">
		<p>
			Contact Information
		</p>
		<p>
			<span class="fs-16 primary-color">(+68) 120034509</span>
		</p>
		<p>info@yourdomain.com</p>
	</div>
</div>	<div id="side-search" class="sidenav">
	<a href="javascript:void(0)" id="side-search-close">&times;</a>
	<div class="sidenav-content">
		<form role="search" id="search">

			<div class="input-group md-form form-sm form-2 pl-0">
			  <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" id="query">
			  <div class="input-group-append">
			    <button class="input-group-text red lighten-3" id="">
			    	<span class="lnr lnr-magnifier"></span>
			    </button>
			  </div>
			</div>

		</form>
	</div>
	
</div>	<nav id="header-navbar" class="navbar navbar-expand-lg py-4">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white" href="/">
            <h3 class="font-weight-bolder mb-0">TRUEFITT&HILL</h3>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-nav-header" aria-controls="navbar-nav-header" aria-expanded="false" aria-label="Toggle navigation">
            <span class="lnr lnr-menu"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-nav-header">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="annual-page.php">Annual</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="gift-page.php">Gift Card</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="free-page.php">Free Voucher</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="paid-page.php">Paid Service</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../new-home-page/new-home-page.php">Back</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../../login-page/login.php">Logout</a>
                </li>
                <li class="nav-item">
                    <a id="side-search-open" class="nav-link" href="#">
                        <span class="lnr lnr-magnifier"></span>
                    </a>
                </li>
                 <li class="nav-item only-desktop">
                    <a class="nav-link" id="side-nav-open" href="#">
                        <span class="lnr lnr-menu"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div id="side-nav" class="sidenav">
	<a href="javascript:void(0)" id="side-nav-close">&times;</a>
	
	<div class="sidenav-content">
		<p>
			Contact Information
		</p>
		<p>
			<span class="fs-16 primary-color">(+91) 73412 33456</span>
		</p>
		<p>truefill&hill@gmail.com</p>
	</div>
</div><div id="side-search" class="sidenav">
	<a href="javascript:void(0)" id="side-search-close">&times;</a>
	<div class="sidenav-content">
		<form action="">

			<div class="input-group md-form form-sm form-2 pl-0">
			  <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search">
			  <div class="input-group-append">
			    <button class="input-group-text red lighten-3" id="basic-text1">
			    	<span class="lnr lnr-magnifier"></span>
			    </button>
			  </div>
			</div>

		</form>
	</div>
	
</div>	<div class="jumbotron jumbotron-single d-flex align-items-center" style="background-image: url(../img/bg.jpg)">
  <div class="container text-center">
    <h1 class="display-2 mb-4">Gift Card</h1>
  </div>
</div>	<section id="who-we-are" class="bg-white">
    <div class="container">
        <div class="section-content">
            <div class="title-wrap" data-aos="fade-up">
                <div class="col-md-12 text-center">
                    <h2 class="mb-2" id="login-text"><b>Gift Card Membership Appointments</b></h2>
                    <p id="login-text2"></p>Remaining gift card membership appointments scheduled<br>
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>
    </div>

    <section id="skills" class="bg-white">
    <div class="container">
        <div class="section-content pt-0 text-center">
            <div id="full_table" class="table-wrapper">
                <table class="fl-table table-striped">
                <thead><tr>

                <th>Sr. No.</th>
                <th>Name</th>
                <th>Date</th>
                <th>Timing</th>
                <th>Barber</th>
                <th>Style</th>
                <th>Membership</th>
                </thead>
                <tbody>
                <?php
                if(is_array($fetchData)){      
                $sn=1;
                foreach($fetchData as $data){
                ?>
                <tr>
                <td><?php echo $sn; ?></td>
                <td><?php echo $data['Name']??''; ?></td>
                <td><?php echo $data['Date']??''; ?></td>
                <td><?php echo $data['Timing']??''; ?></td>
                <td><?php echo $data['Barber']??''; ?></td>
                <td><?php echo $data['Style']??''; ?></td>
                <td><?php echo $data['Membership']??''; ?></td>
                </tr>
                <?php
                $sn++;}}else{ ?>
                <tr>
                    <td colspan="7">
                <?php echo $fetchData; ?>
                </td>
                <tr>
                <?php
                }?>
                </tbody>
                </table>
            </div><br>
        </div>
    </div>

    </section>	


<!-- Features Section-->
<section id="cta" class="bg-fixed overlay" style="background-image: url(../img/bg.jpg);">
    <div class="container">
        <div class="section-content" data-aos="fade-up">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h2 class="mb-2">Download Spreadsheet</h2>
                    <button id="btnExportToCsv" type="button" class="btn btn-outline-primary btn-lg">Download</button>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End of Features Section--></div>
<footer class="mastfoot my-3">
    <div class="inner container">
         <div class="row">
         	<div class="col-lg-4 col-md-12 d-flex align-items-center">
         		
         	</div>
         	<div class="col-lg-4 col-md-12 d-flex align-items-center">
         		<p class="mx-auto text-center mb-0">Truefitt and Hill <a href="#" target="_blank">Bangalore</a>.</p>
         	</div>
           
            <div class="col-lg-4 col-md-12">
            	<nav class="nav nav-mastfoot justify-content-center">
	                <a class="nav-link" href="#">
	                	<i class="fab fa-facebook-f"></i>
	                </a>
	                <a class="nav-link" href="#">
	                	<i class="fab fa-twitter"></i>
	                </a>
	                <a class="nav-link" href="#">
	                	<i class="fab fa-instagram"></i>
	                </a>
	                <a class="nav-link" href="#">
	                	<i class="fab fa-linkedin"></i>
	                </a>
	                <a class="nav-link" href="#">
	                	<i class="fab fa-youtube"></i>
	                </a>
	            </nav>
            </div>
            
        </div>
    </div>
</footer>	


    <!-- External JS -->
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
	<script src="../vendor/bootstrap/popper.min.js"></script>
	<script src="../vendor/bootstrap/bootstrap.min.js"></script>
	<script src="../vendor/select2/select2.min.js "></script>
	<script src="../vendor/owlcarousel/owl.carousel.min.js"></script>
	<script src="../vendor/stellar/jquery.stellar.js" type="text/javascript" charset="utf-8"></script>
	<script src="../vendor/isotope/isotope.min.js"></script>
	<script src="../vendor/lightcase/lightcase.js"></script>
	<script src="../vendor/waypoints/waypoint.min.js"></script>
	 <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
	 
	<!-- Main JS -->
	<script src="../js/app.min.js "></script>
    <script src="js/exportcsv.js"></script>
    <script src="js/bootstrap.min.js"></script>
	<script src="//localhost:35729/livereload.js"></script>
    <script>
        const f = document.getElementById('search');
        const q = document.getElementById('query');
        const google = 'https://www.google.com/search?q=site%3A+';
        const site = 'truefittandhill.in';
  
        function submitted(event) {
          event.preventDefault();
          const url = google + site + '+' + q.value;
          const win = window.open(url, '_blank');
          win.focus();
        }
  
        f.addEventListener('submit', submitted);
    </script>
    <script src="vendor/tilt/tilt.jquery.min.js"></script>
	<script >
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>

    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-23581568-13');
    </script>
</body>
</html>

<!-- python -m http.server 8000 in cmd in this directory to run -->
