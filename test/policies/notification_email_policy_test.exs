defmodule Pomerol.NotificationEmailPolicyTest do
  use Pomerol.PolicyCase

  import Pomerol.NotificationEmailPolicy, only: [create?: 2, update?: 2, delete?: 2]
  import Pomerol.NotificationEmail, only: [create_changeset: 2]

  alias Pomerol.NotificationEmail

  describe "create?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      changeset = %NotificationEmail{} |> create_changeset(%{})

      assert create?(user, changeset)
    end

    test "returns true when user is organization owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      changeset = %NotificationEmail{} |> create_changeset(%{email: "email@email.com", type: "new-quote", organization_id: organization.id})

      assert create?(user, changeset)
    end

    test "returns false when user is viewer of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)
      changeset = %NotificationEmail{} |> create_changeset(%{email: "email@email.com", type: "new-quote", organization_id: organization.id})

      refute create?(user, changeset)
    end

    test "returns false when user is not member of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      changeset = %NotificationEmail{} |> create_changeset(%{email: "email@email.com", type: "new-quote", organization_id: organization.id})

      refute create?(user, changeset)
    end
  end

  describe "update?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      notification_email = insert(:notification_email)

      assert update?(user, notification_email)
    end

    test "returns true when user is organization owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      notification_email = insert(:notification_email, organization: organization)

      assert update?(user, notification_email)
    end

    test "returns false when user is viewer of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)
      notification_email = insert(:notification_email, organization: organization)

      refute update?(user, notification_email)
    end

    test "returns false when user is not member of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)

      refute update?(user, notification_email)
    end
  end

  describe "delete?" do
    test "returns true when user is an admin" do
      user = build(:user, admin: true)
      notification_email = insert(:notification_email)
      assert delete?(user, notification_email)
    end

    test "returns true when user is organization owner" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "owner", member: user, organization: organization)
      notification_email = insert(:notification_email, organization: organization)

      assert delete?(user, notification_email)
    end

    test "returns false when user is viewer of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      insert(:organization_membership, role: "viewer", member: user, organization: organization)
      notification_email = insert(:notification_email, organization: organization)

      refute delete?(user, notification_email)
    end

    test "returns false when user is not member of the orga" do
      user = insert(:user)
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)

      refute delete?(user, notification_email)
    end
  end
end
