defmodule Pomerol.OrganizationTransactionalEmailPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.OrganizationTransactionalEmailPolicy, only: [update?: 2]
  import Pomerol.OrganizationTransactionalEmail, only: [update_changeset: 2]

  alias Pomerol.OrganizationTransactionalEmail

  describe "update" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %OrganizationTransactionalEmail{} |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns false when user is non-member" do
      user = insert(:user)
      organization_transactional_email = insert(:organization_transactional_email)

      changeset = organization_transactional_email |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns false when user is viewer" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)

      organization_transactional_email = insert(:organization_transactional_email, organization: organization)

      changeset = organization_transactional_email |> update_changeset(%{})

      refute update?(user, changeset)
    end

    test "returns true when user is author" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "author", member: user, organization: organization)

      organization_transactional_email = insert(:organization_transactional_email, organization: organization)

      changeset = organization_transactional_email |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is manager" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "manager", member: user, organization: organization)

      organization_transactional_email = insert(:organization_transactional_email, organization: organization)

      changeset = organization_transactional_email |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is admin" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "admin", member: user, organization: organization)

      organization_transactional_email = insert(:organization_transactional_email, organization: organization)

      changeset = organization_transactional_email |> update_changeset(%{})

      assert update?(user, changeset)
    end

    test "returns true when user is owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)

      organization_transactional_email = insert(:organization_transactional_email, organization: organization)

      changeset = organization_transactional_email |> update_changeset(%{})

      assert update?(user, changeset)
    end
  end
end
