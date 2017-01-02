defmodule Pomerol.Email do
  use Bamboo.Phoenix, view: Pomerol.EmailView
  alias Pomerol.{User}

  # TODO: improve and create a generator

  def welcome_email(user) do
    new_email
    |> from("Pomerol<hello@pomerol.io>")
    |> put_header("Reply-To", "hello@pomerol.io")
    |> to("#{Pomerol.UserHelpers.full_name(user)} <#{user.email}>")
    |> subject("welcome to pomerol")
    |> render("welcome_email_#{if (user.locale), do: user.locale, else: "en"}.text")
  end

  def password_reset_request_email(user) do
    new_email
    |> put_text_layout({Pomerol.EmailView, "password_reset_request_#{if (user.locale), do: user.locale, else: "en"}.text"})
    |> assign(:url, "http://localhost:4000")
    |> assign(:token, user.password_reset_token)
    |> from("Pomerol<hello@pomerol.io>")
    |> put_header("Reply-To", "hello@pomerol.io")
    |> to("#{Pomerol.UserHelpers.full_name(user)} <#{user.email}>")
    |> subject("Password reset")
    |> render("password_reset_request_#{if (user.locale), do: user.locale, else: "en"}.text")
  end

  def password_reset_email(user) do
    new_email
    |> put_text_layout({Pomerol.EmailView, "password_reset_#{if (user.locale), do: user.locale, else: "en"}.text"})
    |> from("Pomerol<hello@pomerol.io>")
    |> put_header("Reply-To", "hello@pomerol.io")
    |> to("#{Pomerol.UserHelpers.full_name(user)} <#{user.email}>")
    |> subject("Password has been changed")
    |> render("password_reset_#{if (user.locale), do: user.locale, else: "en"}.text")
  end

  def organization_invite_create(organization_invite) do
    new_email
    |> put_text_layout({Pomerol.EmailView, "organization_invite_create_#{if (organization_invite.user.locale), do: organization_invite.user.locale, else: "en"}.text"})
    |> assign(:url, "http://localhost:4000")
    |> assign(:token, organization_invite.token)
    |> assign(:sender_name, "#{Pomerol.UserHelpers.full_name(organization_invite.user)}")
    |> assign(:organization_name, organization_invite.organization.name)
    |> assign(:sender_message, organization_invite.message)
    |> assign(:sender_email, organization_invite.user.email)
    |> from("Pomerol<hello@pomerol.io>")
    |> put_header("Reply-To", "hello@pomerol.io")
    |> to("#{organization_invite.email}")
    |> subject("Invitation to join Pomerol Account")
    |> render("organization_invite_create_#{if (organization_invite.user.locale), do: organization_invite.user.locale, else: "en"}.text")
  end

end
