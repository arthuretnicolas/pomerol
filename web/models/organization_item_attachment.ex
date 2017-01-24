defmodule Pomerol.OrganizationItemAttachment do
use Arc.Ecto.Schema
  use Pomerol.Web, :model
  import Pomerol.Services.Base64ImageUploaderService

  schema "organization_item_attachments" do
    field :base64_media_data, :string, virtual: true
    field :storage_uuid, :string
    field :media, Pomerol.OrganizationItemMedia.Type
    belongs_to :organization_item, Pomerol.OrganizationItem
    timestamps
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:base64_media_data, :organization_item_id])
    |> validate_required([:base64_media_data])
    |> put_change(:storage_uuid, UUID.uuid4)
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:base64_media_data, :organization_item_id])
    |> validate_required([:base64_media_data])
    |> put_change(:storage_uuid, UUID.uuid4)
    |> upload_image(:base64_media_data, :media)
  end

end
