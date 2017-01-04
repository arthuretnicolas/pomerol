defmodule Pomerol.OrganizationMembershipTest do
  # TODO : improve
  use Pomerol.ModelCase

  alias Pomerol.OrganizationMembership

  describe "create_changeset" do
    @valid_attrs %{member_id: "db1c4e82-8032-4525-8263-8337104ba803", organization_id: "198263ee-fb83-4638-9494-68103d0b6b90", role: "owner"}
    @invalid_attrs %{}

    test "changeset with valid attributes" do
      changeset = OrganizationMembership.create_changeset(%OrganizationMembership{}, @valid_attrs)
      assert changeset.valid?
    end

    test "changeset with invalid attributes" do
      changeset = OrganizationMembership.create_changeset(%OrganizationMembership{}, @invalid_attrs)
      refute changeset.valid?

      assert changeset.errors[:member_id] == {"can't be blank", []}
      assert changeset.errors[:organization_id] == {"can't be blank", []}
      assert changeset.errors[:role] == {"can't be blank", []}
    end

    test "changeset ensures member and organization actually exist" do
      changeset = OrganizationMembership.create_changeset(%OrganizationMembership{}, @valid_attrs)

      { result, changeset } = changeset |> Repo.insert

      assert result == :error
      assert changeset.errors[:organization] == {"does not exist", []}

      # assoc_constraint works through one relationship at a time
      organization = insert(:organization)
      attrs = Map.merge(@valid_attrs, %{organization_id: organization.id})
      changeset = OrganizationMembership.create_changeset(%OrganizationMembership{}, attrs)

      { result, changeset } = changeset |> Repo.insert

      assert result == :error
      assert changeset.errors[:member] == {"does not exist", []}
    end
  end
end
