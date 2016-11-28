defmodule Pomerol.EmailTest do
  use Pomerol.ConnCase

  test "welcome email in english" do
    user = build(:user, locale: "en")

    email = Pomerol.Email.welcome_email(user)

    # assert email.to == user.email
    assert email.subject == "welcome to pomerol"
    # The =~ asserts that the left hand side contains the text on the right
    # assert email.html_body =~ "Welcome to the app"
  end

  test "welcome email in french" do
    user = build(:user, locale: "fr")
    email = Pomerol.Email.welcome_email(user)
    assert email.subject == "bienvenue sur pomerol"
  end
end
