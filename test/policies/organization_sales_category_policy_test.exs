defmodule Pomerol.OrganizationSalesCategoryPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.OrganizationSalesCategoryPolicy, only: [create?: 2, update?: 2]
  import Pomerol.OrganizationSalesCategory, only: [create_changeset: 2, update_changeset: 2]

  alias Pomerol.OrganizationSalesCategory

  describe "create" do
    test "returns true when user is site admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationSalesCategory{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      changeset = %OrganizationSalesCategory{} |> create_changeset(%{name: "Sales", organization_id: organization.id, organization_tax_rate_id: organization_tax_rate.id})

      refute create?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      changeset = %OrganizationSalesCategory{} |> create_changeset(%{name: "Sales", organization_id: organization.id, organization_tax_rate_id: organization_tax_rate.id})

      assert create?(user, changeset)
    end

    test "returns false when organization_tax_rate dont belongs to organization" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      organization_tax_rate = insert(:organization_tax_rate)
      changeset = %OrganizationSalesCategory{} |> create_changeset(%{name: "Sales", organization_id: organization.id, organization_tax_rate_id: organization_tax_rate.id})

      refute create?(user, changeset)
    end
  end

  describe "update" do
    test "returns true when user is site admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationSalesCategory{} |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)

      changeset = organization_sales_category |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns false when organization_tax_rate dont belongs to organization" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)

      organization_tax_rate_2 = insert(:organization_tax_rate)

      changeset = organization_sales_category |> update_changeset(%{organization_tax_rate_id: organization_tax_rate_2.id})

      refute update?(user, changeset)
    end
  end

end
