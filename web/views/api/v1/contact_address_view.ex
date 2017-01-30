defmodule Pomerol.ContactAddressView do
  use Pomerol.Web, :view

  def render("contact_address.json", %{contact_address: contact_address}) do
    %{
      id: contact_address.id,
      address1: contact_address.address1,
      address2: contact_address.address2,
      city: contact_address.city,
      zip: contact_address.zip,
      state: contact_address.state,
      type: contact_address.type,
      country: contact_address.country.country_code
    }
  end

end
