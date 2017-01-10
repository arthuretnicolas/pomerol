defmodule Pomerol.OrganizationTaxRatePolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.OrganizationTaxRatePolicy, only: [create?: 2, update?: 2]
  import Pomerol.OrganizationTaxRate, only: [create_changeset: 2, update_changeset: 2]

  alias Pomerol.OrganizationTaxRate

  describe "create" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationTaxRate{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization = insert(:organization)
      changeset = %OrganizationTaxRate{} |> create_changeset(%{name: "TAX RATE", organization_id: organization.id, tax_rate_percent: 20})

      refute create?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      changeset = %OrganizationTaxRate{} |> create_changeset(%{name: "TAX RATE", organization_id: organization.id, tax_rate_percent: 20})

      assert create?(user, changeset)
    end
  end

  describe "update" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationTaxRate{} |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization_tax_rate = insert(:organization_tax_rate)

      changeset = organization_tax_rate |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns false when user is viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)

      organization_tax_rate = insert(:organization_tax_rate, organization: organization)

      changeset = organization_tax_rate |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns true when user is author" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "author", member: user, organization: organization)

      organization_tax_rate = insert(:organization_tax_rate, organization: organization)

      changeset = organization_tax_rate |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is manager" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)

      organization_tax_rate = insert(:organization_tax_rate, organization: organization)

      changeset = organization_tax_rate |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is admin" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "admin", member: user, organization: organization)

      organization_tax_rate = insert(:organization_tax_rate, organization: organization)

      changeset = organization_tax_rate |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)

      organization_tax_rate = insert(:organization_tax_rate, organization: organization)

      changeset = organization_tax_rate |> update_changeset(%{})

      assert update?(user, changeset)
    end
  end
end
