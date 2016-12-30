defmodule Pomerol.UserPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.UserPolicy, only: [update?: 2]
  import Pomerol.User, only: [update_changeset: 2]

  alias Pomerol.User

  describe "update?" do
    test "returns true if user is updating their own record" do
      user = insert(:user)
      changeset = User.update_changeset(user, %{})
      assert update?(user, changeset)
    end

    test "returns false if user is updating someone else's record" do
      [user, another_user] = insert_pair(:user)
      changeset = User.update_changeset(another_user, %{})
      refute update?(user, changeset)
    end

    test "returns true if user is updating current_organization with membership" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)
      changeset = User.update_changeset(user, %{current_organization_id: organization.id})
      assert update?(user, changeset)
    end

    test "returns false if user is updating current_organization without membership" do
      user = insert(:user)
      organization = insert(:organization)
      changeset = User.update_changeset(user, %{current_organization_id: organization.id})
      refute update?(user, changeset)
    end
  end
end
