
export const verifyEmailHTML = (OTP: string) => {
    return `
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
            font-size: clamp(38px, 3vw, 60px)
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
            <h1 style="color : black"><span style="color: green;">H</span>ome <span style="color: green;">N</span>eeds
            </h1>

            <div class="heading">Your email verification OTP is .</div>

            <h1>
                ${OTP}
            </h1>

            <p style="color: grey;">This One Time Password is only Valid for 5 minutes do not share it with anyone.</p>

            <p style="color: grey;">Thank you for registering with us. Please copy the above code to verify your
                email address.</p>
            <br>

        </section>
    </div>
</body>

</html>
    `
}






export const ResetPasswordHTML = (OTP: string, username: string) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        .highlight {
            color: green;
        }

        .row {
            display: grid;
            align-items: center;
            text-align: center;
            min-height: 100vh;
        }

        .user {
            font-size: clamp(31px, 3vw, 70px);
            font-weight: 600;

        }

        .otp {
            font-size: 50px;
            font-weight: 600;
        }
    </style>
</head>

<body style="padding: 10px; color: black;">
    <div class="container">
        <div class="row min-vh-100 align-items-center text-center">
            <div>
                <H1 class="user">Hi! <span class="highlight">"${username}"</span></H1>
                <p>Your one time password is.</p>
                <p class="otp">${OTP}</p>
                <p>This One Time Password is only Valid for 5 minutes do not share it with anyone it is quite sensitive.
                    if it is not done by you then you can contact us!
                </p>
            </div>

            <div>
                <h4><span class="highlight">H</span>ome <span class="highlight">N</span>eeds</h4>
                <p style="font-size: 11px;">All Rights reserved to HomeNeeds</p>
            </div>
        </div>
    </div>
</body>

</html>
`
}