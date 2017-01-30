defmodule Pomerol.ContactTest do
  use Pomerol.ModelCase

  alias Pomerol.Contact

  describe "create_changeset contact_type=person" do
    test "with valid attributes" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "person",
        first_name: "FN",
        email: "email@email.com",
        addresses: [
          %{
            type: "primary",
            address1: "add1",
            address2: "add2",
            city: "Paris",
            zip: "75006",
            state: "IDF",
            country_code: "FRA"
          }
        ],
        fields: [
          %{
            type: "fax",
            value: "423423423"
          }
        ]
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      assert changeset.valid?
    end

    test "with invalid email" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "person",
        first_name: "FN",
        email: "email"
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      refute changeset.valid?
    end

    test "with invalid contact_type" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "faketype",
        first_name: "FN",
        email: "email@email.com"
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      refute changeset.valid?
    end

    test "with valid company_id" do
      company = insert(:contact_company)
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        company_id: company.id,
        contact_type: "person",
        first_name: "FN",
        email: "email@email.com"
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      assert changeset.valid?
    end

  end

  describe "create_changeset contact_type=company" do
    test "with valid attributes" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "company",
        company_name: "POMEROL CORP",
        email: "email@email.com",
        addresses: [
          %{
            type: "primary",
            address1: "add1",
            address2: "add2",
            city: "Paris",
            zip: "75006",
            state: "IDF",
            country_code: "FRA"
          }
        ],
        fields: [
          %{
            type: "fax",
            value: "423423423"
          }
        ]
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      assert changeset.valid?
    end

    test "with invalid email" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "company",
        company_name: "POMEROL CORP",
        email: "email"
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      refute changeset.valid?
    end

    test "with invalid company_name" do
      attrs = %{
        organization_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        user_id: "56582bfb-ece4-4a46-8481-7dfab79d7785",
        contact_type: "company",
        email: "email"
      }
      changeset = Contact.create_changeset(%Contact{}, attrs)
      refute changeset.valid?
    end
  end
end
