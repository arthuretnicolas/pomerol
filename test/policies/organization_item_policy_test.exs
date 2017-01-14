defmodule Pomerol.OrganizationItemPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.OrganizationItemPolicy, only: [create?: 2, update?: 2]
  import Pomerol.OrganizationItem, only: [create_changeset: 2, update_changeset: 2]

  alias Pomerol.OrganizationItem

  describe "create?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationItem{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization = insert(:organization)
      changeset = %OrganizationItem{} |> create_changeset(%{title: "ITEM TITLE", organization_id: organization.id, description: "ITEM DESCRIPTION"})

      refute create?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      changeset = %OrganizationItem{} |> create_changeset(%{title: "ITEM TITLE", organization_id: organization.id, description: "ITEM DESCRIPTION"})

      assert create?(user, changeset)
    end

    test "returns false when user is viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)
      changeset = %OrganizationItem{} |> create_changeset(%{title: "ITEM TITLE", organization_id: organization.id, description: "ITEM DESCRIPTION"})

      refute create?(user, changeset)
    end
  end

  describe "update?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationItem{} |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization_item = insert(:organization_item)

      changeset = organization_item |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns false when user is viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)

      organization_item = insert(:organization_item, organization: organization)

      changeset = organization_item |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns true when user is author" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "author", member: user, organization: organization)

      organization_item = insert(:organization_item, organization: organization)

      changeset = organization_item |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is manager" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)

      organization_item = insert(:organization_item, organization: organization)

      changeset = organization_item |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is admin" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "admin", member: user, organization: organization)

      organization_item = insert(:organization_item, organization: organization)

      changeset = organization_item |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)

      organization_item = insert(:organization_item, organization: organization)

      changeset = organization_item |> update_changeset(%{})

      assert update?(user, changeset)
    end
  end
end
