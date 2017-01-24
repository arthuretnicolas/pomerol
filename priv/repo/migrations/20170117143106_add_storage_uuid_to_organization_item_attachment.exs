defmodule Pomerol.Repo.Migrations.AddStorageUuidToOrganizationItemAttachment do
  use Ecto.Migration

  def change do
    alter table(:organization_item_attachments) do
      add :storage_uuid, :string
    end

    create unique_index(:organization_item_attachments, [:storage_uuid])
  end
end
