defmodule Pomerol.TransactionalEmailTest do
  use Pomerol.ModelCase

  alias Pomerol.OrganizationTransactionalEmail

  @valid_attrs %{subject: "SUBJECT", body: "BODY", footer: "FOOTER"}
  @invalid_attrs %{subject: ""}

  describe "update_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationTransactionalEmail.update_changeset(%OrganizationTransactionalEmail{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = OrganizationTransactionalEmail.update_changeset(%OrganizationTransactionalEmail{}, @invalid_attrs)
      refute changeset.valid?
    end
  end
end
