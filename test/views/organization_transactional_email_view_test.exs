defmodule Pomerol.OrganizationTransactionalEmailViewTest do
  use Pomerol.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders all attributes and relationships properly" do
    user = insert(:user)
    organization = insert(:organization)
    organization_transactional_email = insert(:organization_transactional_email, organization: organization)

    rendered_json = render(Pomerol.OrganizationTransactionalEmailView, "show.json", organization_transactional_email: organization_transactional_email)

    expected_json = %{
      "id": organization_transactional_email.id,
      "subject": organization_transactional_email.subject,
      "type": organization_transactional_email.type,
      "body": organization_transactional_email.body,
      "footer": organization_transactional_email.footer,
      "organization_id": organization_transactional_email.organization_id
    }

    assert expected_json == rendered_json
  end
end
