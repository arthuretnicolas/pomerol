defmodule Pomerol.OrganizationTaxRateViewTest do
  use Pomerol.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders all attributes and relationships properly" do
    user = insert(:user)
    organization = insert(:organization)
    organization_tax_rate = insert(:organization_tax_rate)
    
    rendered_json = render(Pomerol.OrganizationTaxRateView, "show.json", organization_tax_rate: organization_tax_rate)

    expected_json = %{
      "id": organization_tax_rate.id,
      "default": organization_tax_rate.default,
      "archived": organization_tax_rate.archived,
      "name": organization_tax_rate.name,
      "tax_rate_percent": organization_tax_rate.tax_rate_percent,
      "organization_id": organization_tax_rate.organization_id
    }

    assert expected_json == rendered_json
  end
end
