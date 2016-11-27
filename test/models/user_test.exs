defmodule Pomerol.UserTest do
  use Pomerol.ModelCase
  alias Pomerol.User

  @valid_attrs %{
    encrypted_password: "some content",
    email: "email@email.com",
    first_name: "some content",
    last_name: "some content",
    password: "123456",
    organization_name: "orga test",
    locale: "fr",
    country_id: 1
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.signup_changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.signup_changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
