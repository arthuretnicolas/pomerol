defmodule Pomerol.ContactCompanyView do
  use Pomerol.Web, :view

  def render("contact_company.json", %{contact_company: contact_company}) do
    %{
      id: contact_company.id,
      name: contact_company.name
    }
  end

end
