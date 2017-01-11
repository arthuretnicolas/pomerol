defmodule Pomerol.OrganizationSalesCategoryView do
  use Pomerol.Web, :view

  def render("show.json", %{organization_sales_category: organization_sales_category}) do
    %{
      id: organization_sales_category.id,
      organization_id: organization_sales_category.organization_id,
      name: organization_sales_category.name,
      archived: organization_sales_category.archived,
      default: organization_sales_category.default,
      description: organization_sales_category.description,
      tax_rate: render_one(organization_sales_category.organization_tax_rate, Pomerol.OrganizationTaxRateView, "show.json")
    }
  end
end
