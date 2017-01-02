defmodule Pomerol.OrganizationInvitePolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.OrganizationInvitePolicy, only: [create?: 2]
  import Pomerol.OrganizationInvite, only: [create_changeset: 2]

  alias Pomerol.OrganizationInvite

  describe "create" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationInvite{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization = insert(:organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "test@email.com", organization_id: organization.id, role: "manager"})

      refute create?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "test@email.com", organization_id: organization.id, role: "manager"})

      assert create?(user, changeset)
    end

    test "returns true when user is manager" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "test@email.com", organization_id: organization.id, role: "manager"})

      assert create?(user, changeset)
    end

    test "returns true when manager invites a viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "test@email.com", organization_id: organization.id, role: "viewer"})

      assert create?(user, changeset)
    end

    test "returns false when user is viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "test@email.com", organization_id: organization.id, role: "manager"})

      refute create?(user, changeset)
    end

    test "returns false when user try to invite his email" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: user.email, organization_id: organization.id, role: "manager"})

      refute create?(user, changeset)
    end

    test "returns false when manager invite an admin" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)
      changeset = %OrganizationInvite{} |> create_changeset(%{email: "email@email.com", organization_id: organization.id, role: "admin"})

      refute create?(user, changeset)
    end

  end
end
