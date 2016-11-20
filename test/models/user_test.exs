defmodule Pomerol.UserTest do
  use Pomerol.ModelCase
  alias Pomerol.User

  @valid_attrs %{
    encrypted_password: "some content",
    email: "email@email.com",
    first_name: "some content",
    last_name: "some content",
    password: "123456",
    locale: "fr"
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.registration_changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.registration_changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
