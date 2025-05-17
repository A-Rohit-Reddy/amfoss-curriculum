import os

basedir = os.path.abspath(os.path.dirname(__file__))

class ApplicationConfig:
    SECRET_KEY = os.environ.get("SECRET_KEY", "fallback-secret-key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'db.sqlite')}"
