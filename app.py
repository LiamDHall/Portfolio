import os
from flask import (
    Flask, flash, render_template, redirect, request, session, url_for)
from flask_mail import Mail, Message


app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY")

mail_settings = {
    "MAIL_SERVER": "smtp.gmail.com",
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.environ["MAIL_USERNAME"],
    "MAIL_PASSWORD": os.environ["MAIL_PASSCODE"],
}

app.config.update(mail_settings)
mail = Mail(app)


@app.route("/", methods=["GET", "POST"])
@app.route("/home", methods=["GET", "POST"])
def home():

    if request.method == "POST":
        first_name = request.form.get("first-name")
        last_name = request.form.get("last-name")
        if request.form.get("company-name") == "":
            company_name = "No company name given"
        else:
            company_name = request.form.get("company-name")
        sender_email = request.form.get("email")
        message = request.form.get("message")

        context = {
            'first_name': first_name,
            'last_name': last_name,
            'company_name': company_name,
            'sender_email': sender_email,
            'message': message,
        }

        # Send confirmation email to sender
        msg = Message(
            subject="Contact Confirmation - Liam Hall Full-Stack Developer",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[sender_email],
            body=render_template('email/contact_confirm.txt', context=context)
        )
        mail.send(msg)

        # Send contact form to myself
        msg = Message(
            subject=f"New Protfolio Message / {first_name}@{company_name}",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[app.config.get("MAIL_USERNAME")],
            body=render_template('email/portfolio_contact.txt', context=context)
        )
        mail.send(msg)

    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
