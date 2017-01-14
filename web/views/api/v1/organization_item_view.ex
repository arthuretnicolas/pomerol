defmodule Pomerol.OrganizationItemView do
  use Pomerol.Web, :view

  def render("organization_item.json", %{organization_item: organization_item}) do
    %{
      id: organization_item.id
    }
  end
end
