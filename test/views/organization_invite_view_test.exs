defmodule Pomerol.OrganizationInviteViewTest do
  use Pomerol.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders all attributes and relationships properly" do
    user = insert(:user)
    organization = insert(:organization)
    organization_invite = insert(:organization_invite, organization: organization, user: user, email: "email@test.com", role: "manager")
    rendered_json = render(Pomerol.OrganizationInviteView, "organization_invite.json", organization_invite: organization_invite)

    expected_json = %{
      "id": organization_invite.id,
      "email": organization_invite.email,
      "pending": organization_invite.pending,
      "inserted_at": organization_invite.inserted_at,
      "updated_at": organization_invite.updated_at,
      "role": organization_invite.role,
      "sender": %{
        "email": user.email,
        "id": user.id,
        "name": "#{Pomerol.UserHelpers.full_name(user)}"
      }
    }

    assert expected_json == rendered_json
  end

  test "renders public_organization_invite properly" do
    user = insert(:user)
    organization = insert(:organization)
    organization_invite = insert(:organization_invite, organization: organization, user: user, email: "email@test.com", role: "manager")
    rendered_json = render(Pomerol.OrganizationInviteView, "public_organization_invite.json", organization_invite: organization_invite)

    expected_json = %{
      "organization_name": organization.name,
      "pending": true,
      "expired": false,
      "sender": %{
        "email": user.email,
        "name": "#{Pomerol.UserHelpers.full_name(user)}"
      }
    }

    assert expected_json == rendered_json
  end
end
