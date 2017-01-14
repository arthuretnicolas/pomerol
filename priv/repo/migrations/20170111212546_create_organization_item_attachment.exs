defmodule Pomerol.Repo.Migrations.CreateOrganizationItemAttachment do
  use Ecto.Migration

  def change do
    create table(:organization_item_attachments) do
      add :media, :string
      add :organization_item_id, references(:organization_items, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end
