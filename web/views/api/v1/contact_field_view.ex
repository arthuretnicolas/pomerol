defmodule Pomerol.ContactFieldView do
  use Pomerol.Web, :view

  def render("contact_field.json", %{contact_field: contact_field}) do
    %{
      id: contact_field.id,
      type: contact_field.type,
      value: contact_field.value
    }
  end

end
