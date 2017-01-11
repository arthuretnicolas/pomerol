defmodule Pomerol.NotificationEmailViewTest do
  use Pomerol.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders all attributes and relationships properly" do
    user = insert(:user)
    organization = insert(:organization)
    notification_email = insert(:notification_email, organization: organization)

    rendered_json = render(Pomerol.NotificationEmailView, "show.json", notification_email: notification_email)

    expected_json = %{
      "id": notification_email.id,
      "email": notification_email.email,
      "type": notification_email.type,
      "organization_id": notification_email.organization_id
    }

    assert expected_json == rendered_json
  end
end
