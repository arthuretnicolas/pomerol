defmodule Pomerol.AuthorizationTest do
  use Pomerol.ModelCase

  alias Pomerol.Authorization

  @valid_attrs %{provider: "some content", uid: "some content", user_id: "198263ee-fb83-4638-9494-68103d0b6b90", token: "some token"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Authorization.changeset(%Authorization{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Authorization.changeset(%Authorization{}, @invalid_attrs)
    refute changeset.valid?
  end
end
