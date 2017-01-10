defmodule Pomerol.OrganizationTaxRateTest do
  use Pomerol.ModelCase

  alias Pomerol.OrganizationTaxRate

  @valid_attrs %{name: "No Tax", tax_rate_percent: 0}
  @invalid_attrs %{tax_rate_percent: 120}

  describe "create_changeset" do
    test "with valid attributes" do
      attrs =
          @valid_attrs
          |> Map.put(:organization_id, "56582bfb-ece4-4a46-8481-7dfab79d7785")
      changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, attrs)
      assert changeset.valid?
      assert changeset.changes.name == "No Tax"
    end

    test "with invalid attributes" do
      changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, @invalid_attrs)
      refute changeset.valid?
    end

    test "with invalid tax_rate_percent" do
      attrs = %{tax_rate_percent: 120}
      changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, attrs)
      refute changeset.valid?
    end

    test "does not allow duplicate name" do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization, name: "No Tax", default: true, archived: false)
      orgnization_tax_rate_2_attrs = %{name: "No Tax", tax_rate_percent: 10, organization_id: organization.id}
      changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, orgnization_tax_rate_2_attrs)
      {:error, changeset} = Repo.insert(changeset)
      refute changeset.valid?
      assert changeset.errors[:name] == {"has already been taken", []}
    end

  end

  describe "update_changeset" do
    test "with valid attributes" do
      attrs = %{name: "NAME", tax_rate_percent: 10, default: true}
      organization_tax_rate = insert(:organization_tax_rate)
      changeset = OrganizationTaxRate.update_changeset(organization_tax_rate, attrs)

      assert changeset.valid?
    end

    test "with invalid archived" do
      attrs = %{archived: true}
      organization_tax_rate = insert(:organization_tax_rate, default: true)
      changeset = OrganizationTaxRate.update_changeset(organization_tax_rate, attrs)

      refute changeset.valid?

      changeset |> assert_error_message(:archived, "Cannot archive a default tax rate")
    end

    test "with invalid default" do
      attrs = %{default: false}
      organization_tax_rate = insert(:organization_tax_rate)
      changeset = OrganizationTaxRate.update_changeset(organization_tax_rate, attrs)

      refute changeset.valid?

      changeset |> assert_error_message(:default, "Cannot set default to false")
    end
  end
end
