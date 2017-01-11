defmodule Pomerol.OrganizationSalesCategoryViewTest do
  use Pomerol.ConnCase, async: true

  import Phoenix.View, only: [render: 3]

  test "renders all attributes and relationships properly" do
    user = insert(:user)
    organization = insert(:organization)
    organization_tax_rate = insert(:organization_tax_rate, organization: organization)
    organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)

    rendered_json = render(Pomerol.OrganizationSalesCategoryView, "show.json", organization_sales_category: organization_sales_category)

    expected_json = %{
      "id": organization_sales_category.id,
      "default": organization_sales_category.default,
      "archived": organization_sales_category.archived,
      "name": organization_sales_category.name,
      "description": organization_sales_category.description,
      "organization_id": organization_sales_category.organization_id,
      "tax_rate": %{
        "archived": organization_sales_category.organization_tax_rate.archived,
        "default": organization_sales_category.organization_tax_rate.default,
        "id": organization_sales_category.organization_tax_rate.id,
        "name": organization_sales_category.organization_tax_rate.name,
        "organization_id": organization_sales_category.organization_tax_rate.organization_id,
        "tax_rate_percent": organization_sales_category.organization_tax_rate.tax_rate_percent
      }
    }

    assert expected_json == rendered_json
  end
end
