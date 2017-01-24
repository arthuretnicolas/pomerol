defmodule Pomerol.OrganizationItemTest do
  use Pomerol.ModelCase

  alias Pomerol.OrganizationItem

  describe "create_changeset for text item" do
    test "with valid attributes" do
      attrs =
          %{type: "text-item", title: "TITLE"}
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationItem.create_changeset(%OrganizationItem{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = OrganizationItem.create_changeset(%OrganizationItem{}, %{type: "text-item"})
      refute changeset.valid?
    end
  end

  describe "create_changeset for not-optional price-item" do
    test "with valid attributes" do
      attrs =
          %{type: "price-item", title: "TITLE", code: "InternalId", option_type: "not-optional", editable_quantity: false}
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:tax_rate_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:sales_category_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationItem.create_changeset(%OrganizationItem{}, attrs)
      assert changeset.valid?
    end
  end

  describe "create_changeset for optional price-item" do
    test "with valid attributes" do
      attrs =
          %{type: "price-item", title: "TITLE", code: "InternalId", option_type: "optional", selected: false, editable_quantity: false}
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:tax_rate_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:sales_category_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationItem.create_changeset(%OrganizationItem{}, attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      attrs =
          %{type: "price-item", title: "TITLE", code: "InternalId", option_type: "optional", editable_quantity: false}
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:tax_rate_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
          |> Map.put(:sales_category_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationItem.create_changeset(%OrganizationItem{}, attrs)
      refute changeset.valid?
    end
  end
end
