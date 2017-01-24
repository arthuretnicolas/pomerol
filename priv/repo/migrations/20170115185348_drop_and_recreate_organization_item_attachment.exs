defmodule Pomerol.Repo.Migrations.DropAndRecreateOrganizationItemAttachment do
  use Ecto.Migration

  def change do
    drop_if_exists table(:organization_item_attachments)

    create table(:organization_item_attachments, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :media, :string
      add :organization_item_id, references(:organization_items, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end
