defmodule Pomerol.OrganizationTaxRateView do
  use Pomerol.Web, :view

  def render("show.json", %{organization_tax_rate: organization_tax_rate}) do
    %{
      id: organization_tax_rate.id,
      name: organization_tax_rate.name,
      tax_rate_percent: organization_tax_rate.tax_rate_percent,
      default: organization_tax_rate.default,
      archived: organization_tax_rate.archived,
      organization_id: organization_tax_rate.organization_id
    }
  end
end
