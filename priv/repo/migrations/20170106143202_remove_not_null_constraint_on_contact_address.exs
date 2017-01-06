defmodule Pomerol.Repo.Migrations.RemoveNotNullConstraintOnContactAddress do
  use Ecto.Migration

  def up do
    execute "ALTER TABLE contact_addresses ALTER COLUMN country_id DROP NOT NULL"
  end

  def down do
    execute "ALTER TABLE contact_addresses ALTER COLUMN country_id SET NOT NULL"
  end
end
