defmodule Pomerol.ContactPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.ContactPolicy, only: [create?: 2, update?: 2, delete?: 2, show?: 2]
  import Pomerol.Contact, only: [create_changeset: 2]

  alias Pomerol.Contact

  describe "create?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %Contact{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns false when user is not member of organization" do
      user = insert(:user)
      organization = insert(:organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      refute create?(user, changeset)
    end

    test "returns true when user is admin of organization" do
      user = insert(:user)
      organization = insert(:organization)

      insert(:organization_membership, role: "admin", member: user, organization: organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      assert create?(user, changeset)
    end

    test "returns true when user is owner of organization" do
      user = insert(:user)
      organization = insert(:organization)

      insert(:organization_membership, role: "owner", member: user, organization: organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      assert create?(user, changeset)
    end

    test "returns true when user is manager of organization" do
      user = insert(:user)
      organization = insert(:organization)

      insert(:organization_membership, role: "manager", member: user, organization: organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      assert create?(user, changeset)
    end

    test "returns true when user is author of organization" do
      user = insert(:user)
      organization = insert(:organization)

      insert(:organization_membership, role: "author", member: user, organization: organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      assert create?(user, changeset)
    end

    test "returns false when user is viewer of organization" do
      user = insert(:user)
      organization = insert(:organization)

      insert(:organization_membership, role: "viewer", member: user, organization: organization)

      changeset = %Contact{} |> create_changeset(%{organization_id: organization.id})
      refute create?(user, changeset)
    end
  end

  describe "show?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      contact = build(:contact_person_type)

      assert show?(user, contact)
    end

    test "returns false when user is not member of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)

      refute show?(user, contact)
    end

    test "returns true when user is owner of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)
      organization_membership = insert(:organization_membership, member: user, organization: organization, role: "owner")

      assert show?(user, contact)
    end

    test "returns true when user is admin of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)
      organization_membership = insert(:organization_membership, member: user, organization: organization, role: "admin")

      assert show?(user, contact)
    end

    test "returns true when user is manager of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)
      organization_membership = insert(:organization_membership, member: user, organization: organization, role: "manager")

      assert show?(user, contact)
    end

    test "returns true when user is author of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)
      organization_membership = insert(:organization_membership, member: user, organization: organization, role: "author")

      assert show?(user, contact)
    end

    test "returns false when user is viewer of organization" do
      [user, another_user] = insert_pair(:user)
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization, user: another_user)
      organization_membership = insert(:organization_membership, member: user, organization: organization, role: "viewer")

      refute show?(user, contact)
    end
  end

  describe "update?" do

  end

  describe "delete?" do

  end

end
