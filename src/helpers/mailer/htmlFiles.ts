
export const verifyEmailHTML =
    `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
    <style>
        body {
            background-color: #e8e8e8;
            font-family: Arial, sans-serif;
            padding: 10px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h1 {
            font-size: clamp(38px , 3vw , 60px)
        }

        .container {
            background-color: white;
            padding: 30px;
            padding-bottom: 40px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: inline-block;
            max-width: 90%;
        }

        .heading {
            font-size: 20px;
            color: #333;
            margin-bottom: 20px;
        }

        .verify-button {
            background-color: green;
            color: white !important;
            padding: 15px 25px;
            text-decoration: none;
            font-size: 16px;
        }
    </style>
</head>

<body>
    <div class="container">
        <section>
            <h1 style="color : black"><span style="color: green;">H</span>ome <span style="color: green;">N</span>eeds</h1>

            <div class="heading">Verify Email</div>

            <p style="color: grey;">Thank you for registering with us. Please click the button below to verify your
                email address.</p>
            <br>
            <div>
                <a href="URL_TO_VERIFY_EMAIL" class="verify-button">Verify Email</a>
            </div>
        </section>
    </div>
</body>

</html>

`