defmodule Pomerol.OrganizationSalesCategoryTest do
  use Pomerol.ModelCase

  alias Pomerol.OrganizationSalesCategory

  @valid_attrs %{name: "NAME", description: "DESCRIPTION"}
  @invalid_attrs %{name: ""}

  describe "create_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:organization_tax_rate_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationSalesCategory.create_changeset(%OrganizationSalesCategory{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = OrganizationSalesCategory.create_changeset(%OrganizationSalesCategory{}, @invalid_attrs)
      refute changeset.valid?
    end
  end

  describe "update_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:organization_tax_rate_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationSalesCategory.update_changeset(%OrganizationSalesCategory{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = OrganizationSalesCategory.update_changeset(%OrganizationSalesCategory{}, @invalid_attrs)
      refute changeset.valid?
    end
  end
end
