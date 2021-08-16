import os
from flask import (
    Flask, flash, render_template, redirect, request, session, url_for)
from flask_mail import Mail, Message
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

# Mongo DB Constants
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)

# Email Settings
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
def home():
    if session.get("formIDNo") is None:
        session['formIDNo'] = 'nothing'
    # POST contact form if form id no dont match
    if request.method == "POST":
        form_id_no = request.form.get("form-id-no")

        # Stops same form resubmission
        if form_id_no != session["formIDNo"]:
            # Get form info
            first_name = request.form.get("first-name")
            last_name = request.form.get("last-name")
            if request.form.get("company-name") == "":
                company_name = "No company name given"
            else:
                company_name = request.form.get("company-name")
            sender_email = request.form.get("email")
            message = request.form.get("message")

            context = {
                "first_name": first_name,
                "last_name": last_name,
                "company_name": company_name,
                "sender_email": sender_email,
                "message": message,
            }

            # Send confirmation email to sender
            msg = Message(
                subject="Contact Confirmation - Liam Hall Full-Stack Developer",
                sender=app.config.get("MAIL_USERNAME"),
                recipients=[sender_email],
                body=render_template(
                    "email/contact_confirm.txt",
                    context=context
                )
            )
            mail.send(msg)

            # Send contact form to myself
            msg = Message(
                subject=f"New Protfolio Message / {first_name}@{company_name}",
                sender=app.config.get("MAIL_USERNAME"),
                recipients=[app.config.get("MAIL_USERNAME")],
                body=render_template(
                    "email/portfolio_contact.txt",
                    context=context
                )
            )
            mail.send(msg)

            # Set session form vars
            session["formIDNo"] = form_id_no
            session["formSubmitted"] = True

    projects = list(mongo.db.projects.find())

    return render_template(
        "index.html",
        projects=projects,
    )


# Error Handler 404 Page Not Found
@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly

    return render_template('404.html'), 404


@app.errorhandler(Exception)
def handle_exception(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e

    # now you're handling non-HTTP exceptions only
    return render_template("500.html", e=e), 500


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
