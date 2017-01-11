defmodule Pomerol.NotificationEmailTest do
  use Pomerol.ModelCase

  alias Pomerol.NotificationEmail

  @valid_attrs %{email: "email@email.com", type: "new-quote"}
  @invalid_attrs %{email: ""}

  describe "create_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = NotificationEmail.create_changeset(%NotificationEmail{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = NotificationEmail.create_changeset(%NotificationEmail{}, @invalid_attrs)
      refute changeset.valid?
    end

    test "with invalid type" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:type, "not-in-the-list")
      changeset = NotificationEmail.create_changeset(%NotificationEmail{}, attrs)
      refute changeset.valid?
    end
  end

  describe "update_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = NotificationEmail.update_changeset(%NotificationEmail{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = NotificationEmail.update_changeset(%NotificationEmail{}, @invalid_attrs)
      refute changeset.valid?
    end
  end
end
