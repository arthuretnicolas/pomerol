defmodule Pomerol.OrganizationItemAttachment do
  use Pomerol.Web, :model
  use Arc.Ecto.Schema
  import Pomerol.Services.Base64ImageUploaderService

  schema "organization_item_attachments" do
    field :base64_attachment_data, :string, virtual: true
    field :media, Pomerol.OrganizationItemMedia.Type
    belongs_to :organization_item, Pomerol.OrganizationItem
  end
end
